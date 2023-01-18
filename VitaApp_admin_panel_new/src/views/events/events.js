import React, { useEffect, useState } from "react";
import {
  getEvents, deleteEventById, createEvent
} from "../../services/eventService";
import {
  getUserById
} from "../../services/userService";
import { CButton, CListGroup, CModalTitle, CListGroupItem, CModal, CModalHeader, CModalBody, CModalFooter, CFormTextarea, CInput, CInputGroup, CFormInput, CFormLabel } from '@coreui/react'
import {
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../../authConfig";


const Feed = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [textField1, setTextField1] = useState("");
  const [textField2, setTextField2] = useState("");
  const [textField3, setTextField3] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const name = accounts[0] && accounts[0].name;
  let newArray = new Array
  const ListItem = (item) => {

    return (
      <CListGroupItem>
        <h4>{item.item.title}</h4>
        <h6>{item.item.description}</h6>
        <p>{item.item.url}</p>
        <div style={buttons} className="d-grid gap-2 d-md-flex justify-content-md-end">
          {newArray.map((item, index) => (
            <p key={index}>{item.name}</p>
          ))}
          <CButton color="dark" variant="outline" className="float-right" onClick={() => onEdit(item)}>Edit</CButton>
          <CButton color="warning" className="float-right" onClick={() => onDelete(item)}>Delete</CButton>
        </div>
      </CListGroupItem>
    );
  }

  const onEdit = (item) => {

  }
  const onDelete = (item) => {
    setDeleteData(item)
    setDeleteModalVisible(true)
  }
  const deleteEvent = async (item) => {
    await deleteEventById(item.id, accessToken)
    setDeleteModalVisible(false)
    handleActivities();
  }
  const DeleteModal = () => {
    const item = deleteData.item
    return (
      <CModal
        visible={deleteModalVisible}
        onClose={handleCancel}
      >
        <CModalHeader>
          <CModalTitle>Are you sure you want to delete this event?</CModalTitle>
        </CModalHeader>
        <CModalFooter>
          <CButton color="dark" variant="outline" onClick={() => handleCancel()}>Cancel</CButton>
          <CButton color="warning" onClick={() => deleteEvent(item)}>Delete</CButton >
        </CModalFooter>
      </CModal>)
  }

  const handleSave = async () => {
    const postData = {
      title: textField1,
      description: textField2,
      url: textField3,
    };
    try {
      var events = await createEvent(postData, accessToken);
      setIsOpen(false);
      setTextField1("");
      setTextField2("");
      setTextField3("");
      handleActivities();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleCancel = () => {
    setTextField1("");
    setTextField2("");
    setTextField3("");
    setIsOpen(false)
    setDeleteModalVisible(false)
  }

  useEffect(() => {
    requestAccestoken()
  }, [accessToken]);

  const requestAccestoken = async () => {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    await instance.acquireTokenSilent(request).then((response) => {
      setAccessToken(response.accessToken);
    }).then(() => {
      if (accessToken) {
        handleActivities();
      }
    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response) => {
        setAccessToken(response.accessToken);
      }).then(() => {
        if (accessToken) {
          handleActivities();
        }
      });
    });

  }

  const handleActivities = async () => {
    var events = await getEvents(accessToken);
    setData(await events.data);
  };
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton color="dark" style={buttons} onClick={() => setIsOpen(true)}>New event</CButton>
      </div>
      <CModal visible={isOpen} onClose={handleCancel}>
        <CModalHeader closeButton>
          <h5>New event</h5>
        </CModalHeader>
        <CModalBody>
          <form>
            <CFormLabel htmlFor="exampleFormControlTextarea1">Title</CFormLabel>
            <CFormInput placeholder="" value={textField1} id="exampleFormControlTextarea1" onChange={(e) => setTextField1(e.target.value)} ></CFormInput>
            <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
            <CFormTextarea placeholder="" value={textField2} id="exampleFormControlTextarea1" onChange={(e) => setTextField2(e.target.value)} ></CFormTextarea>
            <CFormLabel htmlFor="exampleFormControlTextarea1">Link</CFormLabel>
            <CFormInput placeholder="https://www.gac.nl/" value={textField3} id="exampleFormControlTextarea1" onChange={(e) => setTextField3(e.target.value)} ></CFormInput>
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSave}>Save</CButton>
          <CButton color="secondary" onClick={handleCancel}>Cancel</CButton>
        </CModalFooter>
      </CModal>
      <DeleteModal />
      <CListGroup>
        {data.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </CListGroup>
    </>
  )
}
const buttons = {
  margin: "10px",
};

export default Feed
