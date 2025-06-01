import { Button, Checkbox, Input, Skeleton, SkeletonItem, Text } from "@fluentui/react-components";
import "./Referral.css";
import { useEffect, useState } from "react";
import API from "./API";
import { useSelector } from "react-redux";
//<GuestAddRegular />
//<GuardianFilled />
//<PeopleCommunityAddFilled />
//<PeopleCommunityAddRegular />
//<PeopleRegular />
//<PeopleFilled />
//<PersonAddFilled />
//<PersonAddRegular />

function Referral() {
    const user = useSelector((state) => state.app.user);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [vouched, setVouched] = useState(false);
    const [myReferrals, setMyReferrals] = useState(null);

    const onChangePhoneNumberHandler = (event, data) => {
        if((!/\D/.test(data.value))) {
            setPhoneNumber(data.value);
        }
    };

    const onChangeVouchedHandler = (event, data) => {
        setVouched(data.checked);
    };

    const onClickReferFriendHandler = async (event) => {
        console.log(event);
    }

    useEffect(() => {
        API.get("referral/referrer/id/" + user.id)
        .then((data) => {
            console.log(data);
            setMyReferrals(data);
        })
        .catch((error) => {
            setMyReferrals([]);
        });
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
                </div>
            }
            </div>
        </div>
    );
}

export default Referral;