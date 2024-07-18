'use client';
import { useState, useEffect } from 'react'
import './update-property.css'
import { Button, Modal, Table, notification } from 'antd'
import axios from 'axios'
import { APP_BASE_URL } from '@/constants/Constant'
import { getUserId } from '@/utils/userUtils'
import { capitalizeWords, getUrlString } from '@/utils/helpers'

const UpdateProperty = ({
    showUpdateStatusModal , 
    setShowUpdateStatusModal
}) => {

    const [propertyList, setPropertyList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])

    useEffect(() => {
      async function getPropertyList(){
        const response = await axios.get(
            `${APP_BASE_URL}/Properties/property_histroy?user_id=${getUserId()}`
        )
        setPropertyList(() => response.data.map(item => ({
            key : item.p_id,
            property_id : item.p_id,
            posted_at : item.created_at,
            locality : capitalizeWords(item.locality),
            location : capitalizeWords(item.location),
            property_data : item
        })));
      }
      getPropertyList()
    }, [])
    
    const rowSelection = {
        onChange : (selectedRowKeys , selectedRows) => {
            setSelectedRows(() => selectedRowKeys)
        }
    }

    const columns = [
        {
            title : `Property Id`,
            dataIndex : `property_id`,
            key : `property_id`,
            render : (property_id , record) => {
                return <a href={`/propertydetails/${getUrlString(record.property_data)}-${property_id}`} target='_blank'>{property_id}</a>
            }
        },
        {
            title : `Created At`,
            dataIndex : `posted_at`,
            key : `posted_at`
        },
        {
            title : `Locality`,
            dataIndex : `locality`,
            key : `locality`
        },
        {
            title : `Location`,
            dataIndex : `location`,
            key : `location`
        }
    ]

    async function updateStatus() {
      try {
        const response = await axios.post(
          `${APP_BASE_URL}/Properties/update_property`,
          {
            seller_id: getUserId(),
            p_id: selectedRows,
          }
        );
        notification.success({
          message: "Properties Updated Successfully",
        });
      } catch (error) {
        notification.error({
          message: "Something Went Wrong",
        });
      } finally {
        setShowUpdateStatusModal(() => false);
      }
    }

  return (
    <Modal
      open={showUpdateStatusModal}
      footer={
        <>
          <Button className='cancel-btn' onClick={() => setShowUpdateStatusModal(() => false)}>Cancel</Button>
          {"  "}
          <Button className="update-list-btn" onClick={() => updateStatus()}>Update List</Button>
        </>
      }
      width={"70%"}
      onCancel={null}
    >
      <Table
        columns={columns}
        dataSource={propertyList}
        pagination={false}
        rowSelection={rowSelection}
      />
    </Modal>
  );
}

export default UpdateProperty
