import { ConnectionStatus } from "@utils/enums";

export interface Connection {
  id: string;
  user_id: string;
  requester_id: string;
  status: ConnectionStatus;
}
