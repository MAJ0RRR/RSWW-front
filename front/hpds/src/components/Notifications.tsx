import { List } from "rsuite";

interface Props {
  notificationsList: string[];
}

function Notifications({ notificationsList }: Props) {
  return (
    <>
      <div className="notifications">
        Notifications:
        <br />
        <br />
        <List size="md">
          {notificationsList.map((item, index) => (
            <List.Item key={index} index={index}>
              {item}
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
}

export default Notifications;
