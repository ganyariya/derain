const invokeColumnsProcess = () => {
  return Deno.run({
    cmd: ["tput", "cols"],
    stdout: "piped",
  });
};

const invokeLinesProcess = () => {
  return Deno.run({
    cmd: ["tput", "lines"],
    stdout: "piped",
  });
};

const getColumns = async (): Promise<number> => {
  const process = invokeColumnsProcess();
  const output = new TextDecoder().decode(await process.output());
  return Number(output);
};

const getLines = async (): Promise<number> => {
  const process = invokeLinesProcess();
  const output = new TextDecoder().decode(await process.output());
  return Number(output);
};

export { getColumns, getLines };
