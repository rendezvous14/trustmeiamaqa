import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Trust me, I'm a QA 👨🏻‍💻",
  keywords: "QA, Tester, Automation, Playwright, Web testing",
  description: "Knowledge sharing and How to by trustmeiamaqa"
};

export default Meta;
