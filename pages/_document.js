// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CusDocument extends Document {
    render() {
        console.log('__document.js__')
        return (
        <Html>
            <Head>
                <meta property="custom" content="123123" />
            </Head>
            <body>
                <Main />
            </body>
            <NextScript />
        </Html>
        );
    }
}