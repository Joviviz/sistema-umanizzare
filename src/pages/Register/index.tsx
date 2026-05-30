import { Link, useNavigate } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard";
import styles from "./styles.module.css";
import { useState } from "react";
import { apiService } from "../../services/api";

export function Register() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // registro etapa 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [role, setRole] = useState("USER"); // Removido do swagger

  // registro etapa 2
  const [dataAcolhimento, setDataAcolhimento] = useState("");
  const [horario, setHorario] = useState("");
  const [equipeAtendimento, setEquipeAtendimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [orgaoEncaminhamento, setOrgaoEncaminhamento] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [genero, setGenero] = useState("");
  const [orientacaoSexual, setOrientacaoSexual] = useState("");
  const [identificacaoEtnicoRacial, setIdentificacaoEtnicoRacial] = useState("");
  const [grauEscolaridade, setGrauEscolaridade] = useState("");
  const [funcaoAtual, setFuncaoAtual] = useState("");
  const [interesseOficinas, setInteresseOficinas] = useState("");

  function handleNextStep() {
    setError("");
    // removi !role
    if (!email || !name || !confirmEmail || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (email !== confirmEmail) {
      setError("Os e-mails informados não coincidem");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas informadas não coincidem");
      return;
    }

    setStep(2);
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpf(value);
  }

  async function handleRegister(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!dataAcolhimento || !horario || !cpf || !idade || !telefone) {
      setError("Por favor, preencha os dados principais do acolhimento .");
      return;
    }

    const ageNumber = Number(idade);
    if (ageNumber < 0 || ageNumber > 150) {
      setError("Por favor, coloque uma idade válida.");
      return;
    }

    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf.length !== 11) {
      setError("O CPF deve conter 11 dígitos.");
      return;
    }

    try {
      await apiService.register({
        data_do_Acolhimento: dataAcolhimento,
        horario: horario,
        equipe_de_atendimento: equipeAtendimento,
        nome: name, // tem dois nomes
        cpf: cleanCpf,
        idade: ageNumber,
        telefone: telefone,
        endereco: endereco,
        orgao_responsavel_pelo_encaminhamento: orgaoEncaminhamento,
        estado_civil: estadoCivil,
        genero: genero,
        orientacao_sexual: orientacaoSexual,
        identificacao_etnico_racial: identificacaoEtnicoRacial,
        grau_de_escolaridade: grauEscolaridade,
        funcao_atual: funcaoAtual,
        tem_interesse_em_participar_das_oficinas_do_instituto: interesseOficinas,
        name: name, // tem dois nomes
        email: email,
        password: password,
      });

      console.log("Cadastro completo enviado com sucesso!");

      alert("Cadastro e ficha de acolhimento criados com sucesso!");
      navigate("/login");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível conectar ao servidor.");
    }
  }

  return (
    <main className={styles.page}>
      <AuthCard title={step === 1 ? "Cadastro" : "Ficha de Acolhimento"}>
        <form onSubmit={handleRegister} className={styles.form}>
          {error && <span className={styles.errorMessage}>{error}</span>}

          {/* Etapa 1 - Cadastro Inicial */}
          {step === 1 && (
            <>
              <input
                className={styles.input}
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className={styles.input}
                type="email"
                placeholder="Confirmar Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />

              <input
                className={styles.input}
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                className={styles.input}
                type="password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="button" onClick={handleNextStep} className={styles.button}>
                Continuar para o Questionário
              </button>
            </>
          )}

          {/* Etapa 2 - Cadastro Secundario */}
          {step === 2 && (
            <div className={styles.scrollableForm}>
              <div className={styles.inputGroupRow}>
                data de acolhimento
                <input
                  className={styles.input}
                  type="date"
                  placeholder="Data do Acolhimento"
                  value={dataAcolhimento}
                  onChange={(e) => setDataAcolhimento(e.target.value)}
                />
                horario
                <input
                  className={styles.input}
                  type="time"
                  placeholder="Horário"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
              </div>

              <input
                className={styles.input}
                type="text"
                placeholder="Equipe de Atendimento"
                value={equipeAtendimento}
                onChange={(e) => setEquipeAtendimento(e.target.value)}
              />

              <div className={styles.inputGroupRow}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={handleCpfChange}
                  maxLength={14}
                />
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Idade"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  min="0"
                  max="150"
                />
              </div>

              <input
                className={styles.input}
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />

              <input
                className={styles.input}
                type="text"
                placeholder="Endereço Residencial Completo"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />

              <input
                className={styles.input}
                type="text"
                placeholder="Órgão responsável pelo encaminhamento"
                value={orgaoEncaminhamento}
                onChange={(e) => setOrgaoEncaminhamento(e.target.value)}
              />

              <input
                className={styles.input}
                type="text"
                placeholder="Estado Civil"
                value={estadoCivil}
                onChange={(e) => setEstadoCivil(e.target.value)}
              />

              <div className={styles.inputGroupRow}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Gênero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Orientação Sexual"
                  value={orientacaoSexual}
                  onChange={(e) => setOrientacaoSexual(e.target.value)}
                />
              </div>

              <input
                className={styles.input}
                type="text"
                placeholder="Identificação Étnico-Racial"
                value={identificacaoEtnicoRacial}
                onChange={(e) => setIdentificacaoEtnicoRacial(e.target.value)}
              />

              <input
                className={styles.input}
                type="text"
                placeholder="Grau de Escolaridade"
                value={grauEscolaridade}
                onChange={(e) => setGrauEscolaridade(e.target.value)}
              />

              <input
                className={styles.input}
                type="text"
                placeholder="Função/Trabalho Atual"
                value={funcaoAtual}
                onChange={(e) => setFuncaoAtual(e.target.value)}
              />

              <select
                className={styles.input}
                value={interesseOficinas}
                onChange={(e) => setInteresseOficinas(e.target.value)}
              >
                <option value="">Tem interesse nas oficinas do instituto?</option>
                <option value="Sim">Sim, tenho interesse</option>
                <option value="Não">Não possuo interesse</option>
              </select>

              <div className={styles.buttonGroup}>
                <button type="button" onClick={() => setStep(1)} className={styles.backButton}>
                  Voltar
                </button>
                <button type="submit" className={styles.button}>
                  Finalizar Cadastro
                </button>
              </div>
            </div>
          )}

          <p className={styles.footerText}>
            Já tem uma conta? <Link to="/login">Faça Login</Link>
          </p>
        </form>
      </AuthCard>
    </main>
  );
}