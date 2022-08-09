export const InputSlate = () => {
  // This component is only used to make the scrollbar appear
  // when the maximum height of the input is reached.
  return (
    <div data-slate-node="element">
      <span data-slate-node="text">
        <span data-slate-leaf="true">
          <span data-slate-zero-width="n" data-slate-length="0">
            &#xFEFF;
            <br />
          </span>
        </span>
      </span>
    </div>
  );
};
