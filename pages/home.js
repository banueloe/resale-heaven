import { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  return { props: {} };
}

const Home = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <Button>Test</Button>
    </div>
  );
};

export default Home;
