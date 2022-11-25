import { FaMoneyBill, FaUser,FaRegMoneyBillAlt } from "react-icons/fa";
import { BiStore,BiUserCircle,BiHome } from "react-icons/bi";
import { MdOutlineAssignmentTurnedIn,MdAddShoppingCart } from "react-icons/md";
import { RiStackLine,RiProductHuntLine } from "react-icons/ri";
export const route = [
  {
      id:1,
    name: "Home",
    path: "/home",
    icon: <BiHome className="icons " />,
    subNav: [],
  }, 
  {
    id:2,
    name: "Product",
    path: "",
    icon: <RiProductHuntLine className=" icons" />,
    subNav:[ {
        name: "Products",
        path: "/product",
        icon: <FaUser className="icons" />,
      },
      {
        name: "Add Product",
        path: "/addproduct",
        icon: <FaMoneyBill className="icons" />,
      },]
  },
  {
    id:3,
    name: "Catatory",
    path: "",
    icon: <RiStackLine className="icons" />,
    subNav: [
      {
        name: "Catagories",
        path: "/catagory",
        icon: <FaUser className="icons" />,
      },
      {
        name: "Add Catagory",
        path: "/addcatagory",
        icon: <FaMoneyBill className="icons" />,
      },
      {
        name: "Add Item",
        path: "/additems/id",
        icon: <FaMoneyBill className="icons" />,
      },
    ],
  },
  // {
  //   id:3,
  //   name: "Bills",
  //   path: "",
  //   icon: <FaRegMoneyBillAlt className="icons" />,
  //   subNav: [
  //     {
  //       name: "Bills Detail",
  //       path: "/billdetail",
  //       icon: <FaUser className="icons" />,
  //     },
  //     {
  //       name: "Pay Bill",
  //       path: "/paybill",
  //       icon: <FaMoneyBill className="icons" />,
  //     },
  //   ],
  // },
  {
    id:4,
    name: "Store",
    path: "/store",
    icon: <BiStore className="icons" />,
    subNav: [],
  },
  {
    id:5,
    name: "Assign",
    path: "/",
    icon: <MdOutlineAssignmentTurnedIn className="icons" />,
    subNav: [
      {
        name: "Assign Product",
        path: "/assignproduct",
        icon: <FaUser className="icons" />,
      },
      {
        name: "Add Assign Products",
        path: "/addassignproduct",
        icon: <FaMoneyBill className="icons" />,
      },
      {
        name: "Assign Store",
        path: "/assignstore",
        icon: <FaMoneyBill className="icons" />,
      },
    ],
  },
  {
    id:5,
    name: "Employee",
    path: "/",
    icon: <MdOutlineAssignmentTurnedIn className="icons" />,
    subNav: [
      {
        name: "Employess Detail",
        path: "/employeedetail",
        icon: <FaUser className="icons" />,
      },
      {
        name: "Add Employee",
        path: "/addemployee",
        icon: <FaMoneyBill className="icons" />,
      }
    ],
  },
  // {
  //   id:6,
  //   name: "Venders",
  //   path: "",
  //   icon: <MdAddShoppingCart className="icons" />,
  //   subNav: [
  //     {
  //       name: "Assign Vender",
  //       path: "/venders",
  //       icon: <FaUser className="icons" />,
  //     },
  //     {
  //       name: "Add Vender",
  //       path: "/addvender",
  //       icon: <FaMoneyBill className="icons" />,
  //     },
  //   ],
  // },
  {
    id:7,
    name: "User",
    path: "/",
    icon: <BiUserCircle className="icons" />,
    subNav: [
      {
        name: "Setting",
        path: "/setting",
        icon: <FaUser className="icons" />,
      },
      {
        name: "Add User",
        path: "/adduser",
        icon: <FaMoneyBill className="icons" />,
      },
    ],
  },

];
