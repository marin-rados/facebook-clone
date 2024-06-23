import InputBox from "./inputBox";
import Posts from "./posts";
import Stories from "./stories";

type Props = {
  posts: any;
};

const Feed = ({ posts }: Props) => {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 lg:mr-40 overflow-y-auto scrollbar-hide">
      <div className="mx-auto maw-w-md md:maw-w-lg lg:max-w-2xl">
        <Stories />
        <InputBox />
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Feed;
