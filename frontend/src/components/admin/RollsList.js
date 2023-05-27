import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminRolls, deleteRoll, clearErrors } from '../../actions/rollActions'
import { DELETE_ROLL_RESET } from '../../constants/rollConstants'

const RollsList = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, rolls } = useSelector(state => state.rolls);
    const { error: deleteError, isDeleted } = useSelector(state => state.roll)

    useEffect(() => {
        dispatch(getAdminRolls());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Roll deleted successfully');
            navigate('/admin/rolls');
            dispatch({ type: DELETE_ROLL_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted])

    const setRolls = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Название',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Стоимость',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Наличие',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Изменить',
                    field: 'actions',
                },
            ],
            rows: []
        }

        rolls.forEach(roll => {
            data.rows.push({
                id: roll._id,
                name: roll.name,
                price: `${roll.price} ₽`,
                stock: roll.stock,
                actions: <Fragment>
                    <Link to={`/admin/roll/${roll._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteRollHandler(roll._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteRollHandler = (id) => {
        dispatch(deleteRoll(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Rolls'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Список роллов</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setRolls()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default RollsList
