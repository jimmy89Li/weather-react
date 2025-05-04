import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Title } from './components/Title';
import { Weather } from './components/Weather';
import { WeatherSearch } from './components/WeatherSearch';
import { WeatherCard } from './components/WeatherCard';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Title title='Search your city:' />
        <Weather>
          <WeatherSearch />
          <WeatherCard />
        </Weather>
      </Layout>
    </QueryClientProvider>
  );
};
