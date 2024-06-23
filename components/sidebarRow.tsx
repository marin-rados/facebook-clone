import Image from "next/image";

type Props = {
  src?: string | undefined | null;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string | undefined | null;
};

const SidebarRow = ({ src, Icon, title }: Props) => {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && (
        <Image
          alt="Profile Picture"
          src={src}
          width={30}
          height={30}
          layout="fixed"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};

export default SidebarRow;
