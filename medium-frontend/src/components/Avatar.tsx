

const Avatar = ({name}:{name : string | "Anonymous"}) => {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-semibold text-xl text-black-600 dark:text-gray-300">{name[0]}</span>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Avatar;
