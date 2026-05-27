git reset HEAD~1
rm ./backport.sh
git cherry-pick 29d703e9d26418b54c944e353b190e4b0fd4c327
echo 'Resolve conflicts and force push this branch.\n\nTo backport translations run: bin/i18n/merge-translations <release-branch>'
