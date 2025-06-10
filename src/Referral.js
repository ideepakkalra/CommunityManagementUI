import { Button, Checkbox, Input, Skeleton, SkeletonItem, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, Text } from "@fluentui/react-components";
import "./Referral.css";
import { useEffect, useState } from "react";
import API from "./API";
import { useDispatch, useSelector } from "react-redux";
import { CheckmarkStarburstFilled, CheckmarkStarburstRegular, PhoneRegular, SendFilled } from "@fluentui/react-icons";
import { showErrorMessage, showSuccessMessage } from "./slice";

function Referral() {
    const user = useSelector((state) => state.app.user);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [vouched, setVouched] = useState(false);
    const [myReferrals, setMyReferrals] = useState(null);
    const dispatch = useDispatch();

    const onChangePhoneNumberHandler = (event, data) => {
        if((!/\D/.test(data.value))) {
            setPhoneNumber(data.value);
        }
    };

    const onChangeVouchedHandler = (event, data) => {
        setVouched(data.checked);
    };

    const onClickReferFriendHandler = async (event) => {
        API.post("referral", { "phoneNumber" : "+1" + phoneNumber, state: "OPEN" })
            .then((data) => {
                dispatch(showSuccessMessage("Referral successful."));
                setMyReferrals([...myReferrals, data ]);
            })
            .catch((error) => {
                dispatch(showErrorMessage("Referral creation failed. [" + error + "]"));
            })
    }

    const reSendInviteHandler = (referralId) => {
        API.get("referral/invite/send/" + referralId)
        .then((data) => {
            if (data) {
                dispatch(showSuccessMessage("Referral invite sent successfully."));
            } else {
                dispatch(showErrorMessage("Referral invite not sent."));
            }
        })
        .catch((error) => {
            dispatch(showErrorMessage("Error loading your referrals. [" + error + "]"));
        });
    };

    useEffect(() => {
        API.get("referral/referrer/id/" + user.id)
        .then((data) => {
            console.log(data);
            setMyReferrals(data);
        })
        .catch((error) => {
            setMyReferrals([]);
            dispatch(showErrorMessage("Error loading your referrals. [" + error + "]"));
        });
        // eslint-disable-next-line
    }, [user]);

    return (
        <div id='referral'>
            <h1>Refferral's</h1>
            <div id="referral-form">
                <div className="referral-form-row">
                    <Input id='phoneNumber' type='tel' placeholder='10 digit phone number' minLength={10} maxLength={10} value={phoneNumber} onChange={onChangePhoneNumberHandler} contentBefore={<Text id='phoneNumberPrefix'>+1</Text>} style={{width: "100%"}} />
                </div>
                <div className="referral-form-row">
                    <Checkbox required label="You confirm that the person you are reffering is known to you. You personally know this person and vouch for good behavior." value={vouched} onChange={onChangeVouchedHandler} />
                </div>
                <div className="referral-form-row">
                    <Button id='refferalButton' onClick={onClickReferFriendHandler} disabled={!vouched || phoneNumber.length !== 10}>Reffer Friend</Button>
                </div>
            </div>
            <div id="referral-list">
            {
                !myReferrals && 
                <Skeleton>
                    <SkeletonItem className="referral-list-skeleton" />
                    <SkeletonItem className="referral-list-skeleton" />
                    <SkeletonItem className="referral-list-skeleton" />
                    <SkeletonItem className="referral-list-skeleton" />
                </Skeleton>
            }
            {
                myReferrals && 
                <div>
                    <h3>Referral's List</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell key="phoneNumber">Phone Number</TableHeaderCell>
                                <TableHeaderCell key="state">State</TableHeaderCell>
                                <TableHeaderCell key="url">Registration Actions</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {myReferrals.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <TableCellLayout media={<PhoneRegular />}>
                                            {item.phoneNumber}
                                        </TableCellLayout>
                                    </TableCell>
                                    <TableCell>
                                        <TableCellLayout media={item.state === "OPEN" ? <CheckmarkStarburstRegular /> : <CheckmarkStarburstFilled />}>
                                            {item.state === "OPEN" ? "Not Registered" : "Registered"}
                                        </TableCellLayout>
                                    </TableCell>
                                    <TableCell>
                                        <TableCellLayout>
                                            <Button icon={<SendFilled />} disabled={item.state === "CLOSED"} onClick={(event) => reSendInviteHandler(item.id)}>Resend Invite</Button>
                                        </TableCellLayout>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            }
            </div>
        </div>
    );
}

export default Referral;