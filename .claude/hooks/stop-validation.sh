#!/bin/bash
# Stop hook: Remind Claude to verify work before ending
# Based on repo recommendation for verification loops

echo "REMINDER: Before ending, verify your work:"
echo "- Run tests if applicable"
echo "- Check for TypeScript errors (tsc --noEmit)"
echo "- Review git diff for unintended changes"
echo "- Ensure no console.log/debugger statements left behind"

exit 0
