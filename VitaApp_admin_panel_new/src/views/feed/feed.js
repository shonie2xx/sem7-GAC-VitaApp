import React, { useEffect, useState } from "react";
import {
  getNews, createNews, deleteNewsById
} from "../../services/newsService";
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
  const [title, setTitle] = useState("");
  const [textField1, setTextField1] = useState("");
  const [textField2, setTextField2] = useState("");
  const [textField3, setTextField3] = useState("");
  const [textField4, setTextField4] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const name = accounts[0] && accounts[0].name;

  const ListItem = (item) => {
    return (
      <CListGroupItem>
        <h4>{item.item.title}</h4>
        <h6>{item.item.description}</h6>
        <p>{item.item.url}</p>
        <div style={buttons} className="d-grid gap-2 d-md-flex justify-content-md-end">
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
  const deleteItem = async (item) => {
    await deleteNewsById(item.id, accessToken)
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
          <CModalTitle>Are you sure you want to delete this item?</CModalTitle>
        </CModalHeader>
        <CModalFooter>
          <CButton color="dark" variant="outline" onClick={() => handleCancel()}>Cancel</CButton>
          <CButton color="warning" onClick={() => deleteItem(item)}>Delete</CButton >
        </CModalFooter>
      </CModal>)
  }

  const handleSave = async () => {
    const postData = {
      title: textField1,
      description: textField2,
      link: textField3,
    };
    try {
      var createEvent = await createNews(postData, accessToken);
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
    var news = await getNews(accessToken);
    setData(await news.data);
    console.log(news.data)
  };
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton color="dark" style={buttons} onClick={() => setIsOpen(true)}>New item</CButton>
      </div>
      <CModal visible={isOpen} onClose={handleCancel}>
        <CModalHeader closeButton>
          <h5>New Item</h5>
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
