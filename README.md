# traps-registration

Update README to test some workflow changes...

Register to use traps under General Licences

## Build

```sh
docker build -t naturescot/trap-registration:develop .
```

## Run

```sh
docker run \
  --name trap-registration \
  --env SESSION_SECRET=override_this_value \
  --env TRAP_API_URL=http://trap-registration-api:3001/trap-registration-api/v1/registrations \
  --network licensing \
  --detach \
  naturescot/trap-registration:develop
```

## License

Unless stated otherwise, the codebase is released under the [MIT License](LICENSE.txt). The documentation is available under the terms of the [Open Government Licence, Version 3](LICENSE-OGL.md).

This software uses [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) - see [LICENSE-GOVUK.txt](LICENSE-GOVUK.txt).

This software uses [Google Roboto](https://github.com/google/roboto) - see [LICENSE-ROBOTO.txt](LICENSE-ROBOTO.txt).
