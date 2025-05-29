import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <Container style={{ textAlign: 'center', paddingTop: '50px' }}>
      <Stack align="center">
        <Title order={1} mb="lg">
          404 - Page Not Found
        </Title>
        <Text c="dimmed" mb="xl">
          Oops! The page you are looking for does not exist.
        </Text>
        <Button component={Link} to="/" leftSection={<IconHome size={18} />} variant="outline">
          Go to Homepage
        </Button>
      </Stack>
    </Container>
  );
};
