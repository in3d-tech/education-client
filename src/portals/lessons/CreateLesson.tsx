import { useForm } from "react-hook-form";

export function CreateLesson() {
  return (
    <div>
      <div>
        <h3>Create Lesson</h3>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
}

const Form: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // try {

    try {
      const response = await fetch("http://localhost:3000/create-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      return res;
    } catch {
      console.log("error with signup");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="headline">headline</label>
        <input
          placeholder="headline"
          {...register("headline")} //, { required: "First Name Required" }
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input
          placeholder="Description"
          {...register("description")} // , { required: "First Name Required" }
        />
      </div>

      <div>
        <label htmlFor="instructions">Instructions: </label>
        <input
          placeholder="Instructions"
          {...register("instructions")} // , { required: "Email Required" }
        />
      </div>

      <div>
        <label htmlFor="language">Language: </label>
        <select {...register("language")}>
          <option value="he">Hebrew</option>
          <option value="ar">Arabic</option>
        </select>
      </div>

      <div>
        <label htmlFor="class">Class: </label>
        <select {...register("class")}>
          {[...Array(12).keys()].map((number) => (
            <option key={number + 1} value={number + 1}>
              {number + 1}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" />
    </form>
  );
};

type FormData = {
  headline: string;
  description: string;
  instructions: string;
  language: string;
  class: number | string;
};
