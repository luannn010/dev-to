import { createUsersTable } from "./usersTable";
import { createRefreshTokensTable } from "./refreshTokensTable";

export const initializeTables = async (): Promise<void> => {
    await createUsersTable();
    await createRefreshTokensTable();
};
