import React, { useState, useEffect } from 'react'

import { getMemberBoard } from '../services/user.service'

// 去打 抓userBoard內容的api
// render出資料

const BoardUser = () => {
    const [content, setContent] = useState('')

    // useEffect(() => {
    //     UserService.getMemberBoard().then(
    //         (response) => {
    //             setContent(response.data)
    //         },
    //         (error) => {
    //             console.log('getMemberBoard error:', error)
    //             const _content = 
    //                 (error.response &&
    //                 error.response.data &&
    //                 error.response.data.message) ||
    //                 error.message ||
    //                 error.toString()
                
    //             setContent(_content)
    //         }
    //     )
    // }, [])

    return (
        <div className='container'>
            <header>
                <h3>content</h3>
            </header>
        </div>
    )
}

export default BoardUser