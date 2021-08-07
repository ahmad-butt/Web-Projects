import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SidebarChat from "./SidebarChat";
import { setLogout } from "../features/user/userSlice";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectCounter } from "../features/counter/counterSlice";

//Material-UI modal style-class
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();

  const logout = (event)=>{
    event.preventDefault();
    auth.signOut().then(
      dispatch(setLogout())
    )
  }

  const handleNewRoomName = (event) => {
    event.preventDefault();
    setNewRoomName(event.target.value);
  };

  const fetchDataFromServer = async (query, variables = {}) => {
    const response = await fetch("http://localhost:2000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    return result;
  };

  const loadRooms = async () => {
    const query = `
            query{
                aboutRooms{
                    id
                    name
                    lastMessage
                }
            }
        `;

    const result = await fetchDataFromServer(query);

    setRooms(result?.data?.aboutRooms);

    // dispatch(setIncrement());
  };

  const count = useSelector(selectCounter);

  const createNewRoom = async (newRoom) => {
    const query = `
        mutation addRomm($newRoom: RoomInputs!) {
            newRoom(newRoom: $newRoom) {
                name
                lastMessage
            }
        }
      `;
    const result = await fetchDataFromServer(query, { newRoom });

    if (result) {
      loadRooms();
    }
  };

  useEffect(() => {
    loadRooms();
  }, [count]);

  const handleAddRoom = async (event) => {
    event.preventDefault();
    const roomToAdd = {
      name: newRoomName,
      lastMessage: "No Message yet",
    };
    createNewRoom(roomToAdd);
    setNewRoomName("");
    handleClose();
  };

  //Material-UI modal open and close functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar onClick={logout} src={props.profilePicture} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__addRoom">
        <button onClick={handleOpen}>Add Room</button>
      </div>
      <div className="sidebar__chats">
          {
              rooms?.map((room)=>{
                  return(
                      <SidebarChat roomID={room.id} key={room.id} roomName={room.name} lastMessage={room.lastMessage} fetchDataFromServer={fetchDataFromServer}/>
                  )
              })
          }
      </div>

      {/* Material-UI Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Enter New Room and start chatting🚀🚀</h2>
            <form>
              <div className="sidebarChat__addRoomInput">
                <input
                  value={newRoomName}
                  onChange={handleNewRoomName}
                  type="text"
                  placeholder="New Room Name"
                />
                <button onClick={handleAddRoom}>Add Room</button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Sidebar;