// import { FC, useEffect } from 'react'
// import { useParams } from "react-router-dom"

// import NavbarComponent from '../components/NavBar';

// import '../assets/css/issuePage.css'
// import { BreadCrumbs } from '../components/BreadCrumbs'
// import { useDispatch } from 'react-redux'
// import {} from '../slices/slice'
// import { AppDispatch } from '../store'

// const IssuePage: FC = () => {

//     const { id } = useParams()
//     const dispatch: AppDispatch = useDispatch()
//     const mining_order = useMiningOrder()

//     useEffect(() => {
//         if (!id) return
//         let id_numeric: number = parseInt(id)
//         if (isNaN(id_numeric)) return

//         const getDetails = async (id: number) => {
//             dispatch(fetchMiningOrderById(id))
//         }

//         getDetails(id_numeric)
//     }, [])

//     return (
//         <>
//             <NavbarComponent/>
//             <BreadCrumbs crumbs={[
//                 {
//                     label: 'Заявка',
//                     path: '/mining_order'
//                 },
//                 {
//                     label: mining_order?.name
//                 }
//             ]}></BreadCrumbs>
//             <div className='d-flex flex-column ms-4 content-fluid'>
//                <h2 className='text-uppercase'>{mining_order?.name}</h2>
//                <div className='issue-details container-fluid mt-3'>
//                     <div className='p-0'>
//                         <div className='appeal-img-bg'>
//                             <img src={mining_order?.image} className='appeal-img' alt='appeal'></img>
//                         </div>
//                     </div>
//                     <div className='issue-details-description mt-2'>
//                         <p>{mining_order?.description}</p>
//                     </div>
//                </div>
//             </div>
//         </>
//     )
// }

// export default IssuePage