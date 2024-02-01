import React, { useContext } from 'react';
import { UsePayment } from '../hooks/usePayment';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import Nav from '../components/partials/nav';
import BottomBar from '../components/partials/BottomBar';
import swal from 'sweetalert';
import { userContext } from '../contexts/userContext';
import { AccountBalanceOutlined } from '@mui/icons-material';
import { useMakeDepo } from '../hook/transactions';

function DepositPage(props) {
    const [price, setPrice] = useState('')
    const { handleFlutterPayment } = UsePayment(price)
    const { makeDepo, loading } = useMakeDepo()
    const [userDetails, setuserDetails] = useContext(userContext)
    function handleClick(price) {
        if (Number(price) < 1000) {
            swal('Error', 'Your deposit amount must be greater than ₦1,000', 'error')
            return
        }
        if (!userDetails._id) {
            swal('You must me logged in to perform this action')
            console.log(userDetails)
            return
        }
        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                if (response.status === "completed") {
                    makeDepo(userDetails._id, price, 'deposit')
                } else {
                    alert('An error occured')
                }
            },
            onClose: () => {
                console.log('closed')
            },
        });
    }

    return (
        <div>
            <Nav />
            <div className='straight' style={{ height: '60vh' }}>
                <center>
                    <div className="border border-success rounded">
                        <div className="straight py-3" style={{ flexDirection: 'column' }}>
                            <div className="small faint">
                                Balance <AccountBalanceOutlined fontSize='inherit' />
                            </div>
                            <div className="text-success">
                                ₦ {userDetails.balance ? Number(userDetails.balance).toLocaleString() : '0.00'}
                            </div>
                        </div>
                    </div>

                    <br />
                    <label>Enter amount:</label>
                    <input
                        value={price}
                        type="number"
                        className="form-control mt-1"
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='enter amount(₦)'
                    />
                    <br />
                    <Button
                        colorScheme='green'
                        isLoading={loading}
                        className='w-100 text-uppercase'
                        onClick={() => handleClick(price)}
                        // onClick={() => makeDepo(userDetails._id, price, 'deposit')}

                    >
                        Proceed
                    </Button>
                </center>
            </div>
            <BottomBar />
        </div>
    );
}

export default DepositPage;