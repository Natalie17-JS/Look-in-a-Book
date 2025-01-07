import CreatePost from "./CreatePost";
import Link from "next/link";

export default function NewPost() {
  return (
    <div>
      <CreatePost />
      <Link href="/allpages/profile">
        <button>Back to profile</button>
      </Link>
    </div>
  );
}
