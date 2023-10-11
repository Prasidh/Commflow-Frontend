import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: '',
};

export const AccountProfile = () => (
  <Card style={{"box-shadow": "rgba(50, 50, 93, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -2px"}}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
            {JSON.parse(sessionStorage.getItem("user")).fullname}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
            {JSON.parse(sessionStorage.getItem("user")).email}
        </Typography>

      </Box>
    </CardContent>
    <Divider />
      <CardActions>
          <label htmlFor="image-upload" className="w-full">
              <Button
                  style={{"background-color": "#4267cf", "color": "white"}}
                  component="span"
                  variant="text"
                  fullWidth
              >
                  Upload picture
              </Button>
          </label>
          <input
              id="image-upload"
              type="file"
              style={{ display: 'none' }}
              // Handle the file selection logic using an onChange event handler
          />
      </CardActions>
  </Card>
);
