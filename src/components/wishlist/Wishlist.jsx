import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import UserContext from '../context/context'

export default function Wishlist(props) {


    let stateShow = {
        accounts: []

    }
    const context = useContext(UserContext)
    const [stateWishlist, setStateWishlist] = useState(stateShow)

    let getAllAccount = async () => {
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/addwishlist/${context.idUser}.json`
        try {
            let response = await Axios.get(url)
            console.log("response Data", response.data);
            let arr = []
            for (let key in response.data) {
                const account = response.data[key]

                arr.push({

                    ...account,
                    id: key
                })
            }
            console.log("arr ", arr);
            setStateWishlist({
                accounts: arr
            })

        } catch (error) {

            console.log(error)

        }

    }







    


    useEffect(() => {
        getAllAccount()


    }, [])

    





    const imgStyle = {
        width: '150px',
        height: '150px'
    }

    return (
        <>
            <div className='row mt-5 mb-5 container'>
                {
                    stateWishlist.accounts.map((value, index) => {
                        return (
                            <div className='col-md-4 offset-sm-1 offset-md-1 mt-5 col-sm-3 card'>
                                <div className='ml-5 card-body'>
                                    <h4>{value.productName}</h4>
                                    <img src={value.image} className="mt-3 ml-2" style={imgStyle} alt="img"></img>
                                    <div className='text-primary'>{value.brand}</div>
                                    <div>price:{value.price}</div>


                                </div>

                            </div>
                        )

                    })
                }
            </div>


        </>
    )
}
