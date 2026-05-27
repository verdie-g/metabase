git reset HEAD~1
rm ./backport.sh
git cherry-pick 8ca87a3ff34f1ae61d88c6c308090c826d15b717
echo 'Resolve conflicts and force push this branch.\n\nTo backport translations run: bin/i18n/merge-translations <release-branch>'
