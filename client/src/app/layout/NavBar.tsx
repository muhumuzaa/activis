const NavBar = ({createActivity}: {createActivity: () => void}) => {
  return (
    <div className=" bg-blue-500 text-white sticky top-0 w-full">
      <div className="max-w-7xl mx-auto flex justify-between py-4">
        <a href="#">Activis</a>
        <div className="space-x-6">
          <button className="bg-green-500 hover:bg-green-600 py-1 px-2 rounded-lg text-white" onClick={createActivity}>
            Create Actvity
          </button>
          <a href="#" className="">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
