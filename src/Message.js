import { Button, MessageBar, MessageBarActions, MessageBarBody } from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "./slice";

function Message() {
    const message = useSelector((state) => state.app.message);
    const dispatch = useDispatch();

    const closeMessage = (event) => {
        dispatch(clearMessage());
    };

    return (
        <div>
            {
                message && <MessageBar key={"message"} intent={message.type}>
                    <MessageBarBody>
                        {message.body}
                    </MessageBarBody>
                    <MessageBarActions
                        containerAction={
                            <Button appearance="transparent" icon={<DismissRegular />} onClick={closeMessage} />
                        }
                        ></MessageBarActions>
                </MessageBar>
            }
        </div>
    );
}

export default Message;