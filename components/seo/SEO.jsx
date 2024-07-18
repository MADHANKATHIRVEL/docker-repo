'use client';
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({
  title,
  titleTemplate,
  description,
  image,
  url,
  imageAlt,
  type,
  locale,
  siteName,
}) => {
  useEffect(() => {
    if (typeof window!== undefined) {
     !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
           ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded =!0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async =!0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
      fbq("init", "1367225867310496");
      fbq("track", "PageView");
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {title} | {titleTemplate}
        </title>
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
    </HelmetProvider>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
};

SEO.defaultProps = {
  title: "Albion Property Hub",
  titleTemplate: "Albion Property Hub",
  description: "",
  image: "",
  url: "",
  imageAlt: "Property Image",
  type: "website",
  locale: "en_US",
  siteName: "https://albionpropertyhub.com",
};

export default SEO;