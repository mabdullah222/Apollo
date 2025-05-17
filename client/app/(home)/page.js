import Stats from "@/components/stats";
import Welcome from "@/components/welcome";
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

const Home = async ()=>{
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
    return;
  }
  return (
    <div className="flex flex-row grow-1">
      <Welcome />
      <Stats />
    </div>
  );
}

export default Home;