import Head from "next/head";
import React from "react";
import SearchHeader from "../components/SearchHeader";
import Response from "../Response";
import { useRouter } from "next/router";
import SearchResults from "../components/SearchResults";
import ImageResults from "../components/ImageResults";

/*
<script async src="https://cse.google.com/cse.js?cx=e738f568a03844f35">
</script>
<div class="gcse-search"></div>
*/

const search = ({ results }) => {
  console.log(results);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.term} - Search Page</title>
      </Head>
      {/*search header*/}
      <SearchHeader />
      {/*search web and image results*/}
      {router.query.searchType === "image" ? (
        <ImageResults results={results} />
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
};

export default search;

export async function getServerSideProps(context) {
  const startIndex = context.query.start || "1";
  const mockData = false;

  const data = mockData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${
          process.env.API_KEY
        }&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${
          context.query.searchType && "&searchType=image"
        }&start=${startIndex}`
      ).then((response) => response.json());
  return {
    props: {
      results: data,
    },
  };
}
