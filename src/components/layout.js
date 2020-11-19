/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { useSpring, animated } from "react-spring";
import Img from "gatsby-image";
import styled from "styled-components";

import Header from "./header";
import Archive from "./archive";
import "./layout.css";

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`;

const MainFooter = styled.main`
  margin: 3rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      file(relativePath: { regex: "/bg/" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);

  const propsSpring = useSpring({
    from: { height: location.pathname === "/" ? 150 : 300 },
    to: { height: location.pathname === "/" ? 300 : 150 },
  });

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <animated.div style={{ overflow: "hidden", ...propsSpring }}>
        <Img fluid={data.file.childImageSharp.fluid} />
      </animated.div>
      {/* {location.pathname === "/" && (
        <Img fluid={data.file.childImageSharp.fluid} />
      )} */}
      <MainLayout>
        <main>{children}</main>
        <Archive />
      </MainLayout>
      <MainFooter>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </MainFooter>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  location: {},
};

export default Layout;
