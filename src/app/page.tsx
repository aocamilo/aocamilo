import { Project } from "@/types";
import ClientHome from "@/components/client-home";

const projects: Project[] = [
  {
    id: 1,
    title: "Wedding invitation website",
    description:
      "A wedding invitation website with an admin dashboard and a DB for managing guests and a simple UI for sending invitations.",
    tags: [
      "Next.JS",
      "Tailwind CSS",
      "PostgreSQL",
      "Google Auth",
      "NextAuth",
      "TypeScript",
    ],
    liveUrl:
      "https://wedding-v2-one.vercel.app/kate-y-luis/invitation/612a4478-f869-42ca-88dd-8da0815cfb05",
    githubUrl: "https://github.com/aocamilo/wedding-v2",
  },
  {
    id: 2,
    title: "Notifier microservice",
    description: "A microservice for sending notifications to users.",
    tags: ["Nest.JS", "TypeScript", "Docker", "Resend", "GCP"],
    githubUrl: "https://github.com/aocamilo/wp-notifier",
  },
  {
    id: 3,
    title: "Binance order book copy",
    description: `This is a basic clone of binance's Order Book. This projects fetches real time asks and bids data using a web socket, 
      and attempts to display it on a similar way Binance does. 
      To start seeing the order book, the user must input a pair of coin names to form a symbol, i.e. BTC/USDT, 
      if user inputs an invalid pair, a basic error component will be displayed, asking the user to check the pair and try again.`,
    tags: [
      "React",
      "Binance API",
      "Cypress",
      "TypeScript",
      "Material UI",
      "Socket.io",
    ],
    githubUrl: "https://github.com/aocamilo/binance-order-book-copy",
  },
];

export default function Home() {
  return <ClientHome projects={projects} />;
}
