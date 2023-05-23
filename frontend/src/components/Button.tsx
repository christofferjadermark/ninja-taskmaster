function Button(props: { value: string }) {
  return (
    <button className="text-inter mx-2 my-2 h-12 w-40 rounded-3xl bg-secondary px-6 py-2 text-xl font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary  focus:ring-offset-2">
      {props.value}
    </button>
  );
}

export default Button;
