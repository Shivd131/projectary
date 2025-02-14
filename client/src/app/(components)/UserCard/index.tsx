import type { User } from "@/state/api"
import { Avatar, Card, CardContent } from "@mui/material"
import { styled } from "@mui/material/styles"
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.h6.fontSize,
}))
type Props = {
    user: User
}

const UserCard = ({ user }: Props) => {
    return (
        <Card className="dark:bg-gray-500">
            <CardContent className="flex items-center space-x-4 p-4">
                <StyledAvatar src={user.profilePictureUrl || "https://pm-s3-images.s3.us-east-2.amazonaws.com/p1.jpeg"}>
                    {(!user.profilePictureUrl) && user.username.slice(0, 2).toUpperCase()}
                </StyledAvatar>
                <div>
                    <h3 className="font-semibold">{user.username}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default UserCard

