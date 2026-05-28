git reset HEAD~1
rm ./backport.sh
git cherry-pick 0fe9d30bea656d28ee5da856872270c39712a938
echo 'Resolve conflicts and force push this branch.\n\nTo backport translations run: bin/i18n/merge-translations <release-branch>'
