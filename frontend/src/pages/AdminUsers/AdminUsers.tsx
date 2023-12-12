import { UsersKaizen } from "@/components/UsersKaizen";
import * as S from "./styles";
import { AdminCustomSelect } from "@/components/AdminCustomSelect";

type Person = {
  id: number;
  name: string;
  surname?: string;
  picture: string;
};

export function AdminUsers() {
  const people: Person[] = [
    {
      id: 1,
      name: "John",
      surname: "Doe",
      picture:
        "https://img.freepik.com/free-photo/the-girl-in-the-sky_1340-27755.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 2,
      name: "Emily",
      surname: "Taylor",
      picture:
        "https://img.freepik.com/free-photo/a-black-and-white-illustration-of-a-man-with-short-hair-and-a-black-and-white-face_188544-12868.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 3,
      name: "Michael",
      surname: "Johnson",
      picture:
        "https://img.freepik.com/free-photo/girl-with-a-backpack-at-sunset-generative-al_169016-28612.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 4,
      name: "Sophia",
      surname: "Williams",
      picture:
        "https://img.freepik.com/free-photo/a-girl-with-a-flower-on-her-head_1340-30886.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 5,
      name: "Daniel",
      surname: "Brown",
      picture:
        "https://img.freepik.com/free-photo/cute-puppies-listening-to-music-with-headphones-generative-ai_260559-489.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 6,
      name: "Olivia",
      surname: "Martinez",
      picture:
        "https://img.freepik.com/premium-photo/dive-into-a-world-of-adventure-and-warfare-with-attack-on-titan_996353-52.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 7,
      name: "William",
      surname: "Garcia",
      picture:
        "https://img.freepik.com/free-photo/a-girl-with-a-flower-on-her-head_1340-30886.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 8,
      name: "Isabella",
      surname: "Lopez",
      picture:
        "https://img.freepik.com/premium-photo/anime-face-with-blue-eyes-web-banner-for-anime-manga-ai-illustration_536572-1632.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 9,
      name: "David",
      surname: "Rodriguez",
      picture:
        "https://img.freepik.com/premium-photo/dive-into-a-world-of-adventure-and-warfare-with-attack-on-titan_996353-52.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph",
    },
    {
      id: 10,
      name: "Emma",
      surname: "Hernandez",
      picture: `https://img.freepik.com/free-photo/cute-puppies-listening-to-music-with-headphones-generative-ai_260559-489.jpg?size=626&ext=jpg&ga=GA1.1.740998305.1697807416&semt=sph`,
    },
  ];

  return (
    <S.MainContainer>
      <S.Title>Пользователи</S.Title>

      <S.Content>
        <S.SelectorContainer>
          <AdminCustomSelect data={people} placeholder="найти пользователя" multiple={false} styles={{width:'510px', height: "65px"}} />
        </S.SelectorContainer>
        <S.UsersContainer>
          {people.map((user) => (
            <UsersKaizen
              img={user.picture}
              name={`${user.name} ${user.surname}`}
              key={user.id}
              // onClick={() => {
              //   navigate(`/admin/users/`);
              // }}
            />
          ))}
        </S.UsersContainer>
      </S.Content>
    </S.MainContainer>
  );
}
