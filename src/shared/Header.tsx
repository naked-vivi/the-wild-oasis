import Logout from "@/features/authentication/Logout"

function Header() {
    return (
        <div className=" flex px-6 py-3 border-b border-gray-500 w-full">
            <Logout />
        </div>
    )
}

export default Header
