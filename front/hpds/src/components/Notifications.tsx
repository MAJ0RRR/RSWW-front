import { List } from "rsuite";
import NotificationList from "../generalTypes/notificationListType";

interface Props {
  notificationsList: NotificationList;
}

function Notifications({ notificationsList }: Props) {
  return (
    <>
      <div className="notifications">
        Notifications:
        <br />
        <br />
        <List size="md">
          {notificationsList.map((item) => (
            <List.Item>
              {item.message}
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
}

export default Notifications;
