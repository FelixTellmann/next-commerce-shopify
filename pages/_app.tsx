import { GetStaticProps } from "next";
import GoogleFonts from "next-google-fonts";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { FC } from "react";
import "reset-css/sass/_reset.scss";

const title = "Tellmann - E-commerce Web development Studio";
const description = "Creator of things that live on the internet - Web developer, writer and entrepreneur.";


type RootProps = AppProps & {
  linklist: {}
}

export const Root: FC<RootProps> = ({ pageProps, Component, linklist }) => {
  const router = useRouter();
  console.log(linklist)
  return (
    <>
      <>
        <DefaultSeo
          title={title}
          description={description}
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://www.tellmann.co.za/",
            site_name: "Tellmann",
            title,
            description,
            images: [
              {
                url: "https://www.tellmann.co.za/images/og-default.jpg",
                alt: title,
                width: 1200,
                height: 630
              }
            ]
          }}
          twitter={{
            handle: "@Tellmann",
            site: "@FelixTellmann",
            cardType: "summary_large_image"
          }}
          canonical={`https://www.tellmann.co.za/${router.pathname}`}
        />
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:wght@400;500;700&display=swap" />
      </>
      
      <main>
        {`${linklist}`}
        <Component {...pageProps} />
      </main>
    </>
  );
};


export const getStaticProps: GetStaticProps = async() => {

  
  let linklist
  try {
    const res = await fetch(`https://liquix-react.myshopify.com/index.json/?view=json`, {
      method: 'GET',
      cache: "no-cache",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      mode: "no-cors",
      referrerPolicy: "no-referrer"
    })
    linklist = await res.json()
  } catch (err) {
    console.log(err)
  }

  console.log(linklist)
  return {
    props: {
      linklist
    }
  }
}
export default Root;