import React, { useState, VFC } from 'react'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import { TaskList } from './TaskList'
import { TaskEdit } from './TaskEdit'

export const MainTask: VFC = () => {
  const navigation = useNavigate()
  const [text, setText] = useState('')
  console.log('rendered MainTask')

  return (
    <>
      <input
        type="text"
        className="mb-3 px-3 py-2 border border-gray-300"
        placeholder="dummy text ?"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <p className="mb-10 text-xl font-bold">Tasks</p>
      <div className="grid grid-col-2 gap-40">
        <TaskList />
        <TaskEdit />
      </div>
      <ChevronDoubleRightIcon
        onClick={() => navigation('/tags')}
        className="h-5 w-5 mt-2 text-bule-500 cursor-pointer"
      />
      <p>Tag page</p>
    </>
  )
}
