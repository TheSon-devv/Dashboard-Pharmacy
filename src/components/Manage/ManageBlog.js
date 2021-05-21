import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PopUpAddBlog from '../../UI/PopUp/PopUpAddBlog'
import ResultTableBlog from '../../components/content/ResultTableBlog'

const ManageBlog= () => {
    const [show, setShow] = useState(false)
    const closeModal = () => setShow(false)
    const dispatch = useDispatch()

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <button className="btn btn-success" onClick={() => setShow(true)}>Thêm bài</button>
                {
                    show ? (
                        <PopUpAddBlog
                            open={show}
                            closeModal={closeModal}
                            title="Thêm bài đăng"
                        />
                    ) : null
                }
                <ResultTableBlog />
            </div>
        </div>
    )
}

export default ManageBlog

