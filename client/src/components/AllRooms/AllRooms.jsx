import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import s from './AllRooms.module.css'

export const AllRooms = () => {

    const rooms = useSelector(state => state.rooms)

    return(
        <div className={s.container}>
            <div>
                <p>ROOMS</p>
            </div>
            <div>
                {rooms && rooms.map((el, i) => (
                    <div key={i} className={s.block}>
                        <p>{el.name}</p>
                        <p>{el.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}