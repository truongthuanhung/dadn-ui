function SidebarItem({ content, Icon }) {
    return (
        <div className="flex items-center justify-between bg-[#e2e2e2] h-[50px] px-[14px] py-[14px] rounded-lg font-bold mb-[28px]">
            <p className="md:mx-0 mx-auto">{content}</p>
            <Icon />
        </div>
    );
}

export default SidebarItem;
