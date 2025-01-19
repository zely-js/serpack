function parseError(err: Error) {
  const st = err.stack?.split('\n').slice(1);
  return st?.map((stack) => {
    stack = stack.slice(7);
    const $ = {
      at: '',
      loc: '',
    };

    $.loc = (/\([^)]*\)/.exec(stack) || [])[0] || '';
    $.at = stack.replace($.loc, '');

    return $;
  });
}

export { parseError };
