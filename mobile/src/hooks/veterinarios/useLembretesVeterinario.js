import {
  useQuery,
} from '@tanstack/react-query';

import {
  listarAplicacoesVacina,
} from '../../services/aplicacaoVacinaService';

import {
  getPets,
} from '../../services/petService';

import {
  getVacinas,
} from '../../services/vacinaService';

import {
  getUsuarios,
} from '../../services/usuarioService';

import {
  getResponsaveis,
} from '../../services/responsavelService';

import {
  listarVeterinarios,
} from '../../services/veterinarioService';

import {
  useAuth,
} from '../../context/AuthContext';

export function useLembretesVeterinario() {
  const {
    user,
  } = useAuth();

  return useQuery({
    queryKey: [
      'lembretesVeterinario',
      user?.idUsuario,
    ],

    enabled: !!user?.idUsuario,

    queryFn: async () => {
      const [
        aplicacoes,
        pets,
        vacinas,
        usuarios,
        responsaveis,
        veterinarios,
      ] = await Promise.all([
        listarAplicacoesVacina(),
        getPets(),
        getVacinas(),
        getUsuarios(),
        getResponsaveis(),
        listarVeterinarios(),
      ]);

      /*
       * Descobre qual é o registro
       * de veterinário do usuário logado.
       */

      const veterinario =
        veterinarios.find(
          (item) =>
            Number(
              item.idUsuario
            ) ===
            Number(
              user.idUsuario
            )
        );

      if (!veterinario) {
        return [];
      }

      /*
       * Pega somente as aplicações
       * destinadas ao veterinário logado.
       */

      const minhasAplicacoes =
        aplicacoes.filter(
          (aplicacao) =>
            Number(
              aplicacao.idVeterinario
            ) ===
            Number(
              veterinario.idVeterinario
            )
        );

      /*
       * Monta os dados necessários
       * para exibir o lembrete.
       */

      return minhasAplicacoes
        .map((aplicacao) => {
          const pet =
            pets.find(
              (item) =>
                Number(
                  item.idPet
                ) ===
                Number(
                  aplicacao.idPet
                )
            );

          const vacina =
            vacinas.find(
              (item) =>
                Number(
                  item.idVacina
                ) ===
                Number(
                  aplicacao.idVacina
                )
            );

          let responsavel = null;

          if (pet) {
            responsavel =
              responsaveis.find(
                (item) =>
                  Number(
                    item.idResponsavel
                  ) ===
                  Number(
                    pet.idResponsavel
                  )
              );
          }

          let usuario = null;

          if (responsavel) {
            usuario =
              usuarios.find(
                (item) =>
                  Number(
                    item.idUsuario
                  ) ===
                  Number(
                    responsavel.idUsuario
                  )
              );
          }

          return {
            ...aplicacao,

            petNome:
              pet?.nome ||
              'Pet não encontrado',

            vacinaNome:
              vacina?.nome ||
              'Vacina não encontrada',

            pacienteNome:
              usuario?.nome ||
              'Paciente não encontrado',
          };
        })
        .sort(
          (a, b) =>
            new Date(
              a.dataAplicacao
            ) -
            new Date(
              b.dataAplicacao
            )
        );
    },

    refetchOnMount: 'always',
  });
}